package com.example.car;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long id, Car updatedCar) {
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        existingCar.setBrand(updatedCar.getBrand());
        existingCar.setModel(updatedCar.getModel());
        existingCar.setRegistrationNumber(updatedCar.getRegistrationNumber());
        existingCar.setPricePerDay(updatedCar.getPricePerDay());
        existingCar.setAvailable(updatedCar.isAvailable());
        existingCar.setDriverAvailable(updatedCar.isDriverAvailable());
        existingCar.setDriverChargePerDay(updatedCar.getDriverChargePerDay());

        return carRepository.save(existingCar);
    }
}