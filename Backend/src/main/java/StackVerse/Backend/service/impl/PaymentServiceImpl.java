package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.PaymentDTO;
import StackVerse.Backend.entity.Payment;
import StackVerse.Backend.repository.PaymentRepository;
import StackVerse.Backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public PaymentDTO processPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setBookingId(paymentDTO.getBookingId());
        payment.setAmount(paymentDTO.getAmount());
        payment.setStatus(Payment.PaymentStatus.PAID); // In a real app, this would depend on external gateway
        
        Payment savedPayment = paymentRepository.save(payment);
        return mapToDTO(savedPayment);
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
