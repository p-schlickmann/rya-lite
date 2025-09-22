alter table "public"."concepts" add column "parent_id" bigint;

alter table "public"."concepts" add constraint "concepts_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES concepts(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."concepts" validate constraint "concepts_parent_id_fkey";


