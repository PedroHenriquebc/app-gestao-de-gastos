package com.ph.apigastos.controllers;

import com.ph.apigastos.models.GastoModel;
import com.ph.apigastos.repositories.GastoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class GastoController {

    @Autowired
    private GastoRepository gastoRepository;

    @PostMapping("/gasto")
    public ResponseEntity<Object> saveGasto(@RequestBody GastoModel gastoModel) {
            return ResponseEntity.status(HttpStatus.CREATED).body(gastoRepository.save(gastoModel));
        }

    @GetMapping("/gasto")
    public ResponseEntity<List> findAll() {
        List<GastoModel> gastoList = gastoRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(gastoList);
    }
    @GetMapping("/gasto/valor")
    public ResponseEntity<List> findAllGastosValor() {
        List<GastoModel> gastoList = gastoRepository.findAllByOrderByValorDesc();
        return ResponseEntity.status(HttpStatus.OK).body(gastoList);
    }

    @GetMapping("/gasto/categoria")
    public ResponseEntity<List> findAllGastosCategoria() {
        List<GastoModel> gastoList = gastoRepository.findAllByOrderByCategoria();
        return ResponseEntity.status(HttpStatus.OK).body(gastoList);
    }

    @GetMapping("/gasto/{id}")
    public ResponseEntity<Object> findGasto(@PathVariable(value = "id") Long id) {
        boolean gastoExists = gastoRepository.findById(id).isPresent();
        if (!gastoExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gasto não registrado.");
        } else {
            var gastoModel = gastoRepository.findById(id).get();
            return ResponseEntity.status(HttpStatus.OK).body(gastoModel);
        }
    }

    @DeleteMapping("/gasto/{id}")
    public ResponseEntity<Object> deleteGasto(@PathVariable(value = "id") Long id) {
        boolean gastoExists = gastoRepository.findById(id).isPresent();
        if (!gastoExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gasto não registrado.");
        } else {
            var gastoModel = gastoRepository.findById(id).get();
            gastoRepository.delete(gastoModel);
            return ResponseEntity.status(HttpStatus.OK).body("Registro de gasto excluído");
        }
    }

    @PutMapping("/gasto/{id}")
    public ResponseEntity<Object> updateGasto(@PathVariable(value = "id") Long id, @RequestBody GastoModel oldGasto) {
        boolean gastoExists = gastoRepository.findById(id).isPresent();
        if (!gastoExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Gasto não registrado.");
        } else {
            var updatedGasto= gastoRepository.findById(id).get();
            BeanUtils.copyProperties(oldGasto, updatedGasto, "id");
            return ResponseEntity.status(HttpStatus.OK).body(gastoRepository.save(updatedGasto));
        }
    }
}
