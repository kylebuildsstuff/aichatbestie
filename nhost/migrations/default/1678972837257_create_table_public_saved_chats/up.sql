CREATE TABLE "public"."saved_chats" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "chats" jsonb NOT NULL DEFAULT jsonb_build_array(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_saved_chats_updated_at"
BEFORE UPDATE ON "public"."saved_chats"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_saved_chats_updated_at" ON "public"."saved_chats" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
