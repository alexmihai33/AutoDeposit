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
@Table(name = "tblcomenzi")
public class Comanda {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comanda_seq")
    @SequenceGenerator(name = "comanda_seq", sequenceName = "comanda_seq", allocationSize = 1)
    private Short idcomanda;

    @ManyToOne
    @JoinColumn(name = "idpiesa", referencedColumnName = "idpiesa", nullable = false)
    private PieseModel piesa; // Reference to Piesa entity

    @ManyToOne
    @JoinColumn(name = "idclient", referencedColumnName = "idclient", nullable = false)
    private Clienti client; // Reference to Client entity

    @Column(nullable = false, length = 255)
    private String adresa_livrare; // Delivery address

}
