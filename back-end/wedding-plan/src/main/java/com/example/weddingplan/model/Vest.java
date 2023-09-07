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
    private String rentedDate;
    private String returnDate;

    public Vest() {
    }

    public Vest(Long idVest, String nameVest, Boolean flagDelete, Item item, ItemStatus itemStatus) {
        this.idVest = idVest;
        this.nameVest = nameVest;
        this.flagDelete = flagDelete;
        this.item = item;
        this.itemStatus = itemStatus;
    }

    public Vest(Long idVest, String nameVest, Boolean flagDelete, Item item, ItemStatus itemStatus, String rentedDate, String returnDate) {
        this.idVest = idVest;
        this.nameVest = nameVest;
        this.flagDelete = flagDelete;
        this.item = item;
        this.itemStatus = itemStatus;
        this.rentedDate = rentedDate;
        this.returnDate = returnDate;
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

    public String getRentedDate() {
        return rentedDate;
    }

    public void setRentedDate(String rentedDate) {
        this.rentedDate = rentedDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }
}
