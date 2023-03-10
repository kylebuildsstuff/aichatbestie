CREATE TABLE "public"."prompt_profile" ("profile_id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, PRIMARY KEY ("profile_id","user_id") , FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE cascade ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
