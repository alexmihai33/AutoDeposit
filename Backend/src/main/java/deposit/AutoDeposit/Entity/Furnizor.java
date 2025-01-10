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
@Table(name = "tblfurnizori")
public class Furnizor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Short idfurnizor;

    @Column(nullable = false, length = 45)
    private String nume;

    @Column(nullable = false, length = 45)
    private String prenume;

    @Column(nullable = false, length = 15)
    private String nr_tel;

    @Column(nullable = false, length = 100)
    private String adresa;

}
