package com.ph.apigastos.repositories;

import com.ph.apigastos.models.GastoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GastoRepository extends JpaRepository<GastoModel, Long> {
}
