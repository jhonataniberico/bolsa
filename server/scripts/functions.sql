-- FUNCTION: public.__contractor__01_insert(jsonb)

-- DROP FUNCTION public.__contractor__01_insert(jsonb);

CREATE OR REPLACE FUNCTION public.__contractor__01_insert(
	__p_data jsonb)
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

	IF EXISTS(SELECT 1 FROM person WHERE type_doc = __p_data->>'type_doc' AND number_doc = __p_data->>'number_doc') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El número de documento ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE email = __p_data->>'email') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El correo ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE phone = __p_data->>'phone') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El teléfono ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE user = __p_data->>'user') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El usuario ya existe';
	END IF;
	
	INSERT INTO person (name, last_name, type_doc, number_doc, email, phone, "user", password)
	     VALUES (__p_data->>'name',
				 __p_data->>'last_name',
				 __p_data->>'type_doc',
				 __p_data->>'number_doc',
				 __p_data->>'email',
				 __p_data->>'phone',
				 __p_data->>'user',
				 __p_data->>'password')
	  RETURNING id_person
	       INTO __user_id;
		 
	INSERT INTO contractor_detail (_id_person, _id_category, _id_sub_category, company_name, ruc, company_address)
	     VALUES (__user_id,
				 NULLIF(__p_data->>'id_category', '')::INTEGER,
				 NULLIF(__p_data->>'id_sub_category', '')::INTEGER,
				 NULLIF(__p_data->>'company_name', ''),
				 NULLIF(__p_data->>'ruc', ''),
				 NULLIF(__p_data->>'company_address', ''));
    
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



-- FUNCTION: public.__professional__01_insert(jsonb)

-- DROP FUNCTION public.__professional__01_insert(jsonb);

CREATE OR REPLACE FUNCTION public.__professional__01_insert(
	__p_data jsonb)
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

	IF EXISTS(SELECT 1 FROM person WHERE type_doc = __p_data->>'type_doc' AND number_doc = __p_data->>'number_doc') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El número de documento ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE email = __p_data->>'email') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El correo ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE phone = __p_data->>'phone') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El teléfono ya existe';
	END IF;
	
	IF EXISTS(SELECT 1 FROM person WHERE user = __p_data->>'user') = TRUE THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'El usuario ya existe';
	END IF;
	
	INSERT INTO person (name, last_name, type_doc, number_doc, email, phone, "user", password)
	     VALUES (__p_data->>'name',
				 __p_data->>'last_name',
				 __p_data->>'type_doc',
				 __p_data->>'number_doc',
				 __p_data->>'email',
				 __p_data->>'phone',
				 __p_data->>'user',
				 __p_data->>'password')
	  RETURNING id_person
	       INTO __user_id;
		   
	INSERT INTO professional_detail (_id_person, type_professional, schedule, studies, work_experence, summary, hourly_rate) 
	     VALUES (__user_id,
				NULLIF(__p_data->>'type_professional',''),
				NULLIF(__p_data->>'schudele','')::JSONB,
				NULLIF(__p_data->>'studies','')::JSONB,
				NULLIF(__p_data->>'work_expence','')::JSONB,
				NULLIF(__p_data->>'summary',''),
				NULLIF(__p_data->>'hourly_rate','')::NUMERIC);
    
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




-- FUNCTION: public.__work__02_list(integer, character varying)

-- DROP FUNCTION public.__work__02_list(integer, character varying);

CREATE OR REPLACE FUNCTION public.__work__02_list(
	__p_id_professional integer DEFAULT NULL::integer,
	__p_state character varying DEFAULT NULL::character varying)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
    --VARIABLES
    __result JSONB;
    __msj_excep CHARACTER VARYING;
	__works JSONB;
BEGIN
	 WITH works AS (
	 SELECT UPPER(dc.company_name) AS company_name,
		    INITCAP(CONCAT(p.name, ' ', p.last_name)) AS full_name,
		    p.phone,
		    p.email,
		 	w.id_work
	   FROM work w
		    INNER JOIN person p
				    ON p.id_person = w._id_contractor
		    INNER JOIN contractor_detail dc
				    ON dc._id_person = w._id_contractor
	  WHERE w._id_professional = COALESCE(__p_id_professional, w._id_professional)
	    AND w.state = COALESCE(__p_state, w.state)
	)
	SELECT JSONB_AGG(w)
	  INTO __works
	  FROM works w;
    
    -- Respuesta
    __result := JSONB_BUILD_OBJECT(
                    'data'    , COALESCE(__works,'[]'::JSONB),
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


-- FUNCTION: public.__work__03_detail(integer)

-- DROP FUNCTION public.__work__03_detail(integer);

CREATE OR REPLACE FUNCTION public.__work__03_detail(
	__p_id_work integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
    --VARIABLES
    __result JSONB;
    __msj_excep CHARACTER VARYING;
	__work JSONB;
BEGIN

	WITH work_detail AS (
	 SELECT w.description,
	        c.desc_category,
			sc.desc_sub_category,
			w.amount_proposed,
			cd.company_name,
			TO_CHAR(w.register_date,'DD/MM/YYYY HH24:MI:SS') AS register_date
	   FROM work w
	        INNER JOIN contractor_detail cd
			        ON cd._id_person = w._id_contractor
			INNER JOIN category c
			        ON c.id_category = cd._id_category
			 LEFT JOIN sub_category sc
			        ON sc.id_sub_category = cd._id_sub_category
	  WHERE w.id_work = __p_id_work
	)
	SELECT row_to_json(w)::JSONB
	  INTO __work
	  FROM work_detail w;
    
    -- Respuesta
    __result := JSONB_BUILD_OBJECT(
                    'data'    , __work,
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


-- FUNCTION: public.__work__01_insert(jsonb)

-- DROP FUNCTION public.__work__01_insert(jsonb);

CREATE OR REPLACE FUNCTION public.__work__01_insert(
	__p_data jsonb)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
    --VARIABLES
    __result JSONB;
    __msj_excep CHARACTER VARYING;
	__id_work INTEGER;
BEGIN

	
	INSERT INTO work (_id_contractor, _id_professional, description, "state", amount_proposed)
	     VALUES ((__p_data->>'id_contractor')::INTEGER,
				 (__p_data->>'id_professional')::INTEGER,
				 __p_data->>'description',
				 'SOLICITADO',
				 (__p_data->>'amount_proposed')::numeric)
	  RETURNING id_work
	       INTO __id_work;
    
    -- Respuesta
    __result := JSONB_BUILD_OBJECT(
                    'id_work'    , __id_work,
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


-- FUNCTION: public.__professional__02_update_cv(jsonb)

-- DROP FUNCTION public.__professional__02_update_cv(jsonb);

CREATE OR REPLACE FUNCTION public.__professional__02_update_cv(
	__p_data jsonb)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
    --VARIABLES
    __result JSONB;
    __msj_excep CHARACTER VARYING;
	__id_person INTEGER;
BEGIN
	
	__id_person:= (__p_data->>'id_professional')::INTEGER;
	
	IF NOT EXISTS(SELECT 1 
				    FROM professional_detail 
				   WHERE _id_person = __id_person) THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'No existe el profesional';
	END IF;
	
	UPDATE professional_detail
	   SET profession_title = (__p_data->>'profession_title')::CHARACTER VARYING,
	       schedule          = (__p_data->>'schedule')::JSONB,
		   studies           = (__p_data->>'studies')::JSONB,
		   work_experence    = (__p_data->>'work_experence')::JSONB,
		   summary           = (__p_data->>'summary'),
		   hourly_rate       = (__p_data->>'hourly_rate')::NUMERIC
	 WHERE _id_person = __id_person;
    
    -- Respuesta
    __result := JSONB_BUILD_OBJECT(
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
