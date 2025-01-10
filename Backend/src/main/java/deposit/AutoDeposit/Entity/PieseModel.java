package deposit.AutoDeposit.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tblpiese")
public class PieseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tblpiese_seq")
    @SequenceGenerator(name = "tblpiese_seq", sequenceName = "tblpiese_seq", allocationSize = 1)
    private Short idpiesa;

    @ManyToOne
    @JoinColumn(name = "idfurnizor", referencedColumnName = "idfurnizor", nullable = false)
    private Furnizor furnizor;  // Linking to Furnizori by name

    @ManyToOne
    @JoinColumn(name = "idcategorie", referencedColumnName = "idcategorie", nullable = false)
    private Categorie categorie;  // Linking to Categorie by name

//    @Column(nullable = false, length = 255)
//    private Short idfurnizor;
//
//    @Column(nullable = false, length = 255)
//    private Short idcategorie;

    @Column(nullable = false, length = 255)
    private String nume;

    @Column(nullable = false)
    private Double pret;

    @Column(nullable = false)
    private Integer an_fabricatie;

}
