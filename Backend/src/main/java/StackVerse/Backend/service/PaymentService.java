package StackVerse.Backend.service;

import StackVerse.Backend.dto.PaymentDTO;

public interface PaymentService {
    PaymentDTO processPayment(PaymentDTO paymentDTO);
    PaymentDTO getPaymentByBookingId(Long bookingId);
}
