import { Classe } from "./classe";
import { Eleve } from "./eleve";

export class Facturation {
  libelle?: string;
  object?: string;
  description?: string;
  classe?: Classe;
  student?: Eleve;
  montant?: number;
  statut?: string;
}
