package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.PaymentDTO;
import StackVerse.Backend.entity.Payment;
import StackVerse.Backend.repository.PaymentRepository;
import StackVerse.Backend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public PaymentDTO processPayment(PaymentDTO paymentDTO) {
        try {
            // Create Stripe PaymentIntent (card only, no redirect needed)
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(paymentDTO.getAmount().multiply(new BigDecimal("100")).longValue())
                    .setCurrency("usd")
                    .addPaymentMethodType("card")
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            Payment payment = new Payment();
            payment.setBookingId(paymentDTO.getBookingId());
            payment.setAmount(paymentDTO.getAmount());
            payment.setStatus(Payment.PaymentStatus.PENDING);
            
            paymentRepository.save(payment);

            PaymentDTO responseDTO = mapToDTO(payment);
            responseDTO.setClientSecret(intent.getClientSecret());
            return responseDTO;
        } catch (Exception e) {
            throw new RuntimeException("Stripe payment error: " + e.getMessage());
        }
    }

    @Override
    public PaymentDTO getPaymentByBookingId(Long bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return mapToDTO(payment);
    }

    private PaymentDTO mapToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setBookingId(payment.getBookingId());
        dto.setAmount(payment.getAmount());
        dto.setStatus(payment.getStatus().name());
        return dto;
    }
}
