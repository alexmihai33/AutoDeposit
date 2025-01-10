package deposit.AutoDeposit.Entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "tblcategorii")
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Short idcategorie;

    @Column(nullable = false, length = 45, unique = true)
    private String nume;

    @Column(length = 45)
    private String furnizori;

    @Column(length = 255)
    private String descriere;

}