package com.example.booking;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/customer/{customerId}")
    public List<Booking> getBookingsByCustomer(
            @PathVariable Long customerId) {
        return bookingService.getBookingsByCustomer(customerId);
    }

    @PutMapping("/{bookingId}/return")
    public Booking returnCar(@PathVariable Long bookingId) {
        return bookingService.returnCar(bookingId);
    }
}