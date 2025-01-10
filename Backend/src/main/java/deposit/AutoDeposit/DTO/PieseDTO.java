package deposit.AutoDeposit.DTO;

import deposit.AutoDeposit.Entity.PieseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PieseDTO {

    private Short idpiesa;
    private Short idfurnizor; // For POST/PUT
    private Short idcategorie; // For POST/PUT
    private String nume;
    private Double pret;
    private Integer an_fabricatie;
    private String furnizorNume; // For GET
    private String categorieNume; // For GET

    public PieseDTO(PieseModel piesaModel) {
        this.idpiesa = piesaModel.getIdpiesa();
        this.nume = piesaModel.getNume();
        this.pret = piesaModel.getPret();
        this.an_fabricatie = piesaModel.getAn_fabricatie();
        this.idfurnizor = piesaModel.getFurnizor().getIdfurnizor(); // Assuming 'idfurnizor' is in Furnizor entity
        this.idcategorie = piesaModel.getCategorie().getIdcategorie(); // Assuming 'idcategorie' is in Categorie entity
        this.furnizorNume = piesaModel.getFurnizor().getNume(); // Assuming 'nume' is the field in Furnizor entity
        this.categorieNume = piesaModel.getCategorie().getNume(); // Assuming 'nume' is the field in Categorie entity
    }
}

