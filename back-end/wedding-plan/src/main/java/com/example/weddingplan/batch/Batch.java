package com.example.weddingplan.batch;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.model.Vest;
import com.example.weddingplan.services.dress.IDressService;
import com.example.weddingplan.services.status.IStatusService;
import com.example.weddingplan.services.vest.IVestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class Batch {
    @Autowired
    private IDressService dressService;
    @Autowired
    private IStatusService statusService;
    @Autowired
    private IVestService vestService;
    @Scheduled(cron = "0 0 0 * * *")
    private void updateStatusItem() {
        List<Dress> dressList = dressService.getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(3L);
        LocalDate localDate = LocalDate.now();
        for (Dress d: dressList) {
            if (d.getDateMaintenance() != null) {
                LocalDate dateMaintenance = LocalDate.parse(d.getDateMaintenance());
                if (dateMaintenance.plusDays(4).isEqual(localDate)) {
                    d.setItemStatus(statusService.getById(1L));
                    d.setDateMaintenance(null);
                    dressService.addNewDress(d);
                }
            }
        }
        List<Vest> vestList = vestService.getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(3L);
        for (Vest v : vestList) {
            if (v.getDateMaintenance() != null) {
                LocalDate dateMaintenance = LocalDate.parse(v.getDateMaintenance());
                if (dateMaintenance.plusDays(4).isEqual(localDate)) {
                    v.setItemStatus(statusService.getById(1L));
                    v.setDateMaintenance(null);
                    vestService.addNewVest(v);
                }
            }
        }
    }
    @Scheduled(cron = "0 0 0 * * *")
    private void checkReturnDate() {

    }
}
