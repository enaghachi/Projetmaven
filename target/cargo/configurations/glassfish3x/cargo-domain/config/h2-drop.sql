SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists abonnement;

drop table if exists tweet;

drop table if exists utilisateur;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists abonnement_seq;

drop sequence if exists tweet_seq;

drop sequence if exists utilisateur_seq;

