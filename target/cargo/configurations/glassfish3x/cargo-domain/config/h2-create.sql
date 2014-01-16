create table abonnement (
  id                        bigint not null,
  username_ajout            varchar(255),
  date_ajout                timestamp,
  Proprio_username          varchar(255),
  constraint pk_abonnement primary key (id))
;

create table tweet (
  id                        bigint not null,
  datepublication           timestamp,
  label                     varchar(255),
  sujet                     varchar(255),
  taguser                   varchar(255),
  user_username             varchar(255),
  constraint pk_tweet primary key (id))
;

create table utilisateur (
  username                  varchar(255) not null,
  email                     varchar(255),
  password                  varchar(255),
  sexe                      varchar(255),
  date_inscription          timestamp,
  constraint pk_utilisateur primary key (username))
;

create sequence abonnement_seq;

create sequence tweet_seq;

create sequence utilisateur_seq;

alter table abonnement add constraint fk_abonnement_user_1 foreign key (Proprio_username) references utilisateur (username) on delete restrict on update restrict;
create index ix_abonnement_user_1 on abonnement (Proprio_username);
alter table tweet add constraint fk_tweet_user_2 foreign key (user_username) references utilisateur (username) on delete restrict on update restrict;
create index ix_tweet_user_2 on tweet (user_username);


