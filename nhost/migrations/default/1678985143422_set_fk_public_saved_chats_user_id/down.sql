alter table "public"."saved_chats" drop constraint "saved_chats_user_id_fkey",
  add constraint "saved_chats_id_fkey"
  foreign key ("id")
  references "auth"."users"
  ("id") on update cascade on delete cascade;
