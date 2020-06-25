-- Database: bolsa_trabajo

-- DROP DATABASE bolsa_trabajo;

CREATE DATABASE bolsa_trabajo
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE public.person
(
    id_person serial NOT NULL,
    name character varying(60) NOT NULL,
    last_name character varying(60) NOT NULL,
    last_name2 character varying(60),
    type_doc character varying(1),
    number_doc character varying(15),
    email character varying(120),
    phone character varying(15),
    CONSTRAINT "PK__id_person_01" PRIMARY KEY (id_person)
);

CREATE OR REPLACE FUNCTION public.__user__01_insert(
	__p_name character varying,
	__p_last_name character varying,
	__p_type_doc character varying,
	__p_number_doc character varying,
	__p_email character varying,
	__p_phone character varying
)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
    --VARIABLES
    __result JSONB;
    __msj_excep CHARACTER VARYING;
	__user_id INTEGER;
BEGIN
	
	INSERT INTO person (name, last_name, type_doc, number_doc, email, phone)
	     VALUES (__p_name, __p_last_name, __p_type_doc, __p_number_doc, __p_email, __p_phone)
	  RETURNING id_person
	       INTO __user_id;
    
    -- Respuesta
    __result := JSONB_BUILD_OBJECT(
                    'userId'    , __user_id,
					'status' , 0
                );
                
    RETURN __result;

EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 1 , 'msj' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 2, 'msj' , 'Hubo un error', 'stack_error', SQLERRM);
        RETURN __result;
END;
$BODY$;

