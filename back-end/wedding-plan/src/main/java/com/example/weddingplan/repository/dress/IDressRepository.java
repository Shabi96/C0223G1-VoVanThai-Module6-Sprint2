package com.example.weddingplan.repository.dress;

import com.example.weddingplan.model.Dress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IDressRepository extends JpaRepository<Dress, Long> {
    Page<Dress> getAllByFlagDeleteIsFalseAndNameDressContainingAndTypeDress_NameTypeDressContainingAndItemStatus_NameStatusContaining
            (Pageable pageable,String nameDress, String nameTypeDress, String nameStatus);

    Dress getDressByFlagDeleteIsFalseAndNameDressContaining(String name);

    List<Dress> getAllByFlagDeleteIsFalse();
}
