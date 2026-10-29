package com.example.booking;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.car.Car;
import com.example.car.CarRepository;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;

    public BookingService(BookingRepository bookingRepository,
                          CarRepository carRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
    }

    public Booking createBooking(Booking booking) {

        Car car = carRepository.findById(booking.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available");
        }

        if (booking.getPickupDate() == null ||
                booking.getReturnDate() == null) {
            throw new RuntimeException("Pickup and return dates are required");
        }

        if (booking.getReturnDate().isBefore(booking.getPickupDate())) {
            throw new RuntimeException("Return date cannot be before pickup date");
        }

        long days = ChronoUnit.DAYS.between(
                booking.getPickupDate(),
                booking.getReturnDate()
        );

        if (days < 1) {
            days = 1;
        }

        double totalPrice = days * car.getPricePerDay();

        if (booking.isDriverRequired()) {

            if (!car.isDriverAvailable()) {
                throw new RuntimeException("Driver is not available for this car");
            }

            totalPrice += days * car.getDriverChargePerDay();
        }

        booking.setTotalPrice(totalPrice);
        booking.setStatus("BOOKED");

        car.setAvailable(false);
        carRepository.save(car);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Transactional
    public Booking returnCar(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if ("RETURNED".equals(booking.getStatus())) {
            throw new RuntimeException("Car has already been returned");
        }

        Car car = carRepository.findById(booking.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        booking.setStatus("RETURNED");
        car.setAvailable(true);

        carRepository.save(car);

        return bookingRepository.save(booking);
    }
}