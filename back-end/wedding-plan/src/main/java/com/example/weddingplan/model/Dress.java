package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Dress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idDress;
    private String nameDress;
    private Boolean flagDelete;
    @ManyToOne
    @JoinColumn(name = "id_type_dress")
    private TypeDress typeDress;
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

    public Dress() {
    }

    public Dress(Long idDress, String nameDress) {
        this.idDress = idDress;
        this.nameDress = nameDress;
    }

    public Dress(Long idDress, String nameDress, Boolean flagDelete, TypeDress typeDress, Item item, ItemStatus itemStatus, String image, String information, String dateMaintenance, Integer maintenanceTimes) {
        this.idDress = idDress;
        this.nameDress = nameDress;
        this.flagDelete = flagDelete;
        this.typeDress = typeDress;
        this.item = item;
        this.itemStatus = itemStatus;
        this.image = image;
        this.information = information;
        this.dateMaintenance = dateMaintenance;
        this.maintenanceTimes = maintenanceTimes;
    }

    public Dress(Long idDress, String nameDress, Boolean flagDelete, TypeDress typeDress, Item item, ItemStatus itemStatus, String image) {
        this.idDress = idDress;
        this.nameDress = nameDress;
        this.flagDelete = flagDelete;
        this.typeDress = typeDress;
        this.item = item;
        this.itemStatus = itemStatus;
        this.image = image;
    }

    public void setIdDress(Long id) {
        this.idDress = id;
    }

    public Long getIdDress() {
        return idDress;
    }

    public String getNameDress() {
        return nameDress;
    }

    public void setNameDress(String nameDress) {
        this.nameDress = nameDress;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public TypeDress getTypeDress() {
        return typeDress;
    }

    public void setTypeDress(TypeDress typeDress) {
        this.typeDress = typeDress;
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
}
