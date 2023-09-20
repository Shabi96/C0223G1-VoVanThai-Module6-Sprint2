package com.example.weddingplan.services.vest;

import com.example.weddingplan.model.Vest;
import com.example.weddingplan.projection.IVestProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IVestService {
    Vest getVestByFlagDeleteIsFalseAndIdVest(Long id);
    Page<Vest> getVestByFlagDeleteIsFalseAndNameVest(Pageable pageable, String nameVest, String nameStatus);

    List<Vest> getAllByFlagDeleteIsFalse();
    List<IVestProjection> getVestRented(String date);

    void addNewVest(Vest vest);
    List<Vest> getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalse();
    List<Vest> getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(Long id);
    List<Vest> getAllByItemStatus_IdStatus(Long id);


}
