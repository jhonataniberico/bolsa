-- DROP TABLE public.person;
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
    address character varying(200),
    foto_person character varying(150),
    "user" character varying(16),
    "password" character varying(16),
    register_date timestamp without time zone DEFAULT now(),
    CONSTRAINT "PK__01_person__id_person" PRIMARY KEY (id_person)
);


-- DROP TABLE public.combo_type;

CREATE TABLE public.combo_type
(
    id_group integer NOT NULL,
    value character varying(2) COLLATE pg_catalog."default" NOT NULL,
    desc_combo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK__01_combo_type__id_group__value" PRIMARY KEY (id_group, value)
);

-- DROP TABLE public.professional_detail;

CREATE TABLE public.professional_detail
(
    _id_person integer NOT NULL,
    type_professional character varying(2) COLLATE pg_catalog."default",
    profession_title CHARACTER VARYING(120),
    schedule jsonb,
    studies jsonb,
    work_experence jsonb,
    summary text COLLATE pg_catalog."default",
    hourly_rate numeric(8,2),
    comments jsonb,
    CONSTRAINT "PK__professional_01___id_person" PRIMARY KEY (_id_person),
    CONSTRAINT "FK__person_01___id_person" FOREIGN KEY (_id_person)
        REFERENCES public.person (id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    id_category integer NOT NULL,
    desc_category character varying(60) COLLATE pg_catalog."default",
    CONSTRAINT "PK__category_01__id_category" PRIMARY KEY (id_category)
);

-- DROP TABLE public.sub_category;

CREATE TABLE public.sub_category
(
    id_sub_category integer NOT NULL,
    _id_category integer,
    desc_sub_category character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK__sub_category_01__id_sub_category" PRIMARY KEY (id_sub_category),
    CONSTRAINT "FK__catogory_01___id_category" FOREIGN KEY (_id_category)
        REFERENCES public.category (id_category) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE public.contractor_detail;

CREATE TABLE public.contractor_detail
(
    _id_person integer NOT NULL,
    _id_category integer,
    _id_sub_category integer,
    company_name character varying(120) COLLATE pg_catalog."default",
    ruc character varying(15) COLLATE pg_catalog."default",
    company_address character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT "PK__contractor_detail_01___id_person" PRIMARY KEY (_id_person),
    CONSTRAINT "FK__person_01___id_person" FOREIGN KEY (_id_person)
        REFERENCES public.person (id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK__category_02___id_category" FOREIGN KEY (_id_category)
        REFERENCES public.category (id_category) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK__sub_category_03___id_sub_category" FOREIGN KEY (_id_sub_category)
        REFERENCES public.sub_category (id_sub_category) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE public.work;

CREATE TABLE public.work
(
    id_work serial NOT NULL,
    _id_contractor integer NOT NULL,
    _id_professional integer NOT NULL,
    description character varying(250) COLLATE pg_catalog."default",
    state character varying(12) COLLATE pg_catalog."default",
    qualification integer,
    register_date timestamp without time zone DEFAULT now(),
    begin_date timestamp without time zone,
    finish_date timestamp without time zone,
    schelude_work jsonb,
    observation character varying(250) COLLATE pg_catalog."default",
    amount_proposed numeric(8,2),
    CONSTRAINT "PK__01_work__id_work" PRIMARY KEY (id_work),
    CONSTRAINT "FK__01_contractor_detail___id_contractor" FOREIGN KEY (_id_contractor)
        REFERENCES public.contractor_detail (_id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK__02_professional_detail___id_professional" FOREIGN KEY (_id_professional)
        REFERENCES public.professional_detail (_id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.payments
(
    id_payment serial NOT NULL,
    _id_contractor integer,
    _id_professional integer,
    _id_work integer,
    amount numeric(8,2),
    register_date timestamp without time zone DEFAULT now(),
    CONSTRAINT "PK__01_payments__id_payment" PRIMARY KEY (id_payment),
    CONSTRAINT "FK__01_detail_contractor___id_contractor" FOREIGN KEY (id_payment)
        REFERENCES public.contractor_detail (_id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK__02_detail_professional___id_professional" FOREIGN KEY (id_payment)
        REFERENCES public.professional_detail (_id_person) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

