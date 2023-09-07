package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Dress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idDress;
    private String nameDress;
    private Boolean flagDelete;
    private String rentedDate;
    private String returnDate;
    @ManyToOne
    @JoinColumn(name = "id_type_dress")
    private TypeDress typeDress;
    @OneToOne
    @JoinColumn(name = "id_item")
    private Item item;
    @ManyToOne
    @JoinColumn(name = "id_status")
    private ItemStatus itemStatus;

    public Dress() {
    }

    public Dress(Long idDress, String nameDress, Boolean flagDelete, TypeDress typeDress, Item item, ItemStatus itemStatus) {
        this.idDress = idDress;
        this.nameDress = nameDress;
        this.flagDelete = flagDelete;
        this.typeDress = typeDress;
        this.item = item;
        this.itemStatus = itemStatus;
    }

    public Dress(Long idDress, String nameDress, Boolean flagDelete, String rentedDate, String returnDate, TypeDress typeDress, Item item, ItemStatus itemStatus) {
        this.idDress = idDress;
        this.nameDress = nameDress;
        this.flagDelete = flagDelete;
        this.rentedDate = rentedDate;
        this.returnDate = returnDate;
        this.typeDress = typeDress;
        this.item = item;
        this.itemStatus = itemStatus;
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
}
