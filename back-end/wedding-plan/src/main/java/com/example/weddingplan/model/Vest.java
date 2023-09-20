package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Vest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idVest;
    private String nameVest;
    private Boolean flagDelete;
    @OneToOne
    @JoinColumn(name = "id_item")
    private Item item;
    @ManyToOne
    @JoinColumn(name = "id_status")
    private ItemStatus itemStatus;

    private String image;
    private String information;
    private String dateMaintenance;
    private Integer maintenanceTimes;

    public Vest() {
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getDateMaintenance() {
        return dateMaintenance;
    }

    public void setDateMaintenance(String dateMaintenance) {
        this.dateMaintenance = dateMaintenance;
    }

    public Integer getMaintenanceTimes() {
        return maintenanceTimes;
    }

    public void setMaintenanceTimes(Integer maintenanceTimes) {
        this.maintenanceTimes = maintenanceTimes;
    }

    public Vest(Long idVest, String nameVest, Boolean flagDelete, Item item, ItemStatus itemStatus, String image) {
        this.idVest = idVest;
        this.nameVest = nameVest;
        this.flagDelete = flagDelete;
        this.item = item;
        this.itemStatus = itemStatus;
        this.image = image;
    }

    public Long getIdVest() {
        return idVest;
    }

    public void setIdVest(Long idVest) {
        this.idVest = idVest;
    }

    public String getNameVest() {
        return nameVest;
    }

    public void setNameVest(String nameVest) {
        this.nameVest = nameVest;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public ItemStatus getItemStatus() {
        return itemStatus;
    }

    public void setItemStatus(ItemStatus itemStatus) {
        this.itemStatus = itemStatus;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
