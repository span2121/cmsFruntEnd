-- call activityclg.USER_login('LOGIN', '1', 'SACHIN@mail', '12345', null ,null );
--  CALL USER_login(_action, _userId, _userLoginEmail, _userPassword, _userLoginIsEnabeled, _userPasswordReset)
DROP PROCEDURE if exists `USER_login`;
DELIMITER $$
create procedure USER_login(IN _action varchar(100),
								IN _userId char(36),
                                IN _userLoginEmail varchar(100),
                                IN _userPassword varchar(100),
                                IN _userLoginIsEnabeled INT,
                                IN _userPasswordReset int)
USER_login:
BEGIN 
DECLARE userId varchar(100);
DECLARE userPassword varchar(100);
DECLARE userEmail varchar(100);
DECLARE userIsEnabeled int;
DECLARE userRole int;

	IF(_action IS NULL) THEN
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL USER_login: _action can not be empty';
        LEAVE USER_login;
	END IF;
    IF(_action = "LOGIN" ) THEN 
			select user_id, user_name, passwd, email, role_id , is_enable into userId, @useName, userPassword, userEmail, userRole, userIsEnabeled from user where email = _userLoginEmail and passwd = _userPassword ;
		IF(userId is null) then 
			SIGNAL SQLSTATE '41002'set message_text = 'call user_login: user not found';
            leave USER_login;
            END IF;
		if (userIsEnabeled = 0) THEN
            SIGNAL SQLSTATE '41002' SET MESSAGE_TEXT = 'call USER_login: login not enabled';
            LEAVE USER_login;
        END IF;
        IF(_userLoginEmail is null OR _userPassword  is null ) THEN
			SIGNAL sqlstate '41001' SET MESSAGE_TEXT = 'INVALID_DATA';
            LEAVE USER_login;
		END IF;
		IF(_userLoginEmail <> userEmail or _userPassword <> userPassword ) THEN 
				SIGNAL sqlstate '41007' SET MESSAGE_TEXT = 'call USER_login: user name and password are not matching';
            LEAVE USER_login;
		END IF;	
        
        select userId , @useName as userName, userEmail, userRole;
        
	END IF;
	
END$$
DELIMITER ;


    -- call REGISTER_register('TEACHER_REGISTER','std-1','34rf44dd','Natraj','service','gangappa','gangavva',
    -- 'mail@mail.com','3456785643','323454454','ECE','3454','Male','1990-02-02','60','70','12345','3','MTECH','DIP',
    -- 'fnjdbfd fenfjod ','80','6');
--------------------------- Register procedure IN_PROGRESS
DROP PROCEDURE IF EXISTS `REGISTER_register`;
DELIMITER $$
CREATE PROCEDURE REGISTER_register(IN _action varchar(100), IN _reg_code varchar(100), IN _USN_number varchar(32), IN  _firstName varchar(100), 
												IN _lastName varchar(100), IN _fatherName varchar(100), IN _motherNAme varchar(100), IN _emailId varchar(100), 
                                                IN _phoneNo varchar(50), IN _EmergencyContact varchar(50), IN _branch varchar(50), IN _instructor varchar(100), 
                                                IN _gender varchar(30), IN _DOB datetime, IN _matrixPercentage int, IN _puPercentage int, IN _password varchar(100), IN _role varchar(100),
                                                IN _maxQualification varchar(100), IN _subAssigned varchar(100), _address varchar(100), _totalPercentage int, _semister int )
REGISTER_register:
BEGIN 

    DECLARE createdDate datetime ;
    DECLARE updatedDate datetime ;
    DECLARE assignedTeacher varchar(32);
    DECLARE UserId varchar(36);
	set createdDate = date(now()) ;
    set updatedDate = date(now()) ;

IF(_action = 'STUDENT_REGISTER' or _action = 'TEACHER_REGISTER' ) THEN
	set UserId = uuid();
  insert into user (user_id, user_name, passwd, email, role_id, is_enable, created_at, updated_at)
			values (UserId, _firstName , _password, _emailId, _role  , '1',createdDate , updatedDate );
	IF(_action = 'TEACHER_REGISTER') THEN
			insert into teacher(teachers_id, teacher_code, first_name, last_name, father_name, motner_name, emergency_contact, branch, DOB, qualification, phone, gender, email, is_deleted, sub_assigned, permanent_address, created_at, updated_at)
			values (UserId, _reg_code, _firstName, _lastName, _fatherName,_motherNAme,_EmergencyContact, _branch, _DOB, _maxQualification ,_phoneNo,_gender,_emailId,null, _subAssigned ,_address, now(), now() );
	ELSE
		insert into students(id,code, first_name, USN_number, last_name, email, phone, father_name, motner_name, emergency_contact, 
		student_instructor, total_percentage, DOB, branch, adhar_number, semister, gender, is_deleted, created_at, updated_at)
	values(UserId,_reg_code,_firstName, _USN_number, _lastName, _emailId, _phoneNo,_fatherName,_motherNAme,_EmergencyContact,
    _instructor, _totalPercentage ,_DOB,_branch,null,_semister ,_gender,null, now(), now());
		
    END IF;
     select id from students where code= _reg_code and email=_emailId;
END IF;
END$$
DELIMITER ;

------ percentage for the studentsDROP PROCEDURE IF EXISTS `STUDEMNT_Percentage`;
DROP PROCEDURE IF EXISTS `STUDEMNT_Percentage`;
DELIMITER $$
CREATE PROCEDURE STUDEMNT_Percentage(IN _action varchar(100), IN _studentId varchar(100), IN _matrix int, IN _puc int, IN _sem1 int
							, IN _sem2 int,  IN _sem3 int,  IN _sem4 int,  IN _sem5 int,  IN _sem6 int,  IN _sem7 int,  IN _sem8 int )
REGISTER_register:
BEGIN 
	IF(_studentId is null) THEN
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL REGISTER_register: _studentId can not be empty';
        LEAVE REGISTER_register;
    END IF;
		IF(_action = 'ADD_PERCENTAGE') THEN
			IF(_matrix IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Matrix', _matrix, _studentId, now(), now() );
			END IF;
			IF(_puc IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Puc', _puc, _studentId, now(), now() );
			END IF;
            IF(_sem1 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem1', _sem1, _studentId, now(), now() );
			END IF;
            IF(_sem2 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem2', _sem2, _studentId, now(), now() );
			END IF;
            IF(_sem3 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem3', _sem3, _studentId, now(), now() );
			END IF;IF(_sem4 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem4', _sem4, _studentId, now(), now() );
			END IF;IF(_sem5 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem5', _sem5, _studentId, now(), now() );
			END IF;IF(_sem6 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem6', _sem6, _studentId, now(), now() );
			END IF;IF(_sem7 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem7', _sem7, _studentId, now(), now() );
			END IF;IF(_sem8 IS NOT NULL) THEN
				INSERT INTO semister_percentage(semister_percentage_id, class, percentage_obtained, student_id, created_at, updated_at)
				values(uuid(), 'Sem8', _sem8, _studentId, now(), now() );
			END IF;
           select 'Updated' as status;
        END IF;
END$$
DELIMITER ;

-- to get detailes of required things
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_details`(IN _action varchar(59), IN _userId varchar(36), IN _role varchar(50))
fetch_details:
BEGIN
	IF(_action is null) THEN 
    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL fetch_details: _action can not be empty';
        LEAVE fetch_details;
    END IF;
    IF(_userId is null) THEN 
    SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL fetch_details: _userId can not be empty';
        LEAVE fetch_details;
    END IF;
	 IF(_action = 'GET_STUDENT') THEN 
		select * from students where id=_userId;
		select * from semister_percentage where student_id= _userId;
	ELSEIF(_action = 'GET_ALLSTUDENTS') THEN
		select * from teacher where teachers_id = _userId;
		IF(_role = '4') THEN -- for HOD
        select * from students;
        ELSE -- for other staff login will show only students under the teacher
        select * from students where student_instructor = _userId ;
        END IF;
	ELSEIF(_action = 'GET_ALLTEACHERS') THEN 
		select * from teacher;
	ELSEIF(_action = 'GETALL') THEN
		select * from teacher;
        select * from students;
	END IF;
	END
 -- Circular to students and teachersDROP PROCEDURE IF EXISTS ACTIVITY_details;
 -- call ACTIVITY_details('CREATE_ACTIVITY',NULL,NULL,'arrange seats','arrange seats properly different for different people',
-- 'STD-1','2021-03-02','2021-03-09','Sports','1','307d4f06-7b1b-11eb-8b70-6c02e0ad5a17','HIGH')
-- activity related procedure

-- call ACTIVITY_details('CREATE_ACTDETAILS','9eb7c6ec-7b24-11eb-8b70-6c02e0ad5a17',NULL,'arrange seats','arrange seats properly different for different people',
-- '7c107a55-7bd6-11eb-8b70-6c02e0ad5a17','2021-03-02','2021-03-09','Sports','PENDING','307d4f06-7b1b-11eb-8b70-6c02e0ad5a17','HIGH')
-- call ACTIVITY_details('UPDATE_ACTIVITYDET',null,'0d9ed426-7bfa-11eb-8b70-6c02e0ad5a17',null,null,null,null,null,null,'Pending',null,null);

DROP PROCEDURE IF EXISTS ACTIVITY_details;
DELIMITER $$
CREATE PROCEDURE ACTIVITY_details(IN _action varchar(30), IN _activity_id varchar(36), _activity_detail_id varchar(36),
 IN _activity_titile varchar(100), IN _activity_details  varchar(1000), Assigned_to varchar(36), _schedule_date varchar(30), _due_date  varchar(30), 
_activity_type varchar(30), _status varchar(30), _assigned_by varchar(36), _priority varchar(30))
ACTIVITY_details:
BEGIN
	IF(_action = 'CREATE_ACTIVITY') THEN 
		insert into activity(activity_id, activity_title, activity_details, Schedule_date, due_date, assigned_to, assigned_by, status, activity_type, created_at, updated_at, activity_priority)
		values(uuid(), _activity_titile , _activity_details ,_schedule_date, _due_date, Assigned_to , _assigned_by,'Pending', _activity_type, now(), now(), _priority);
       select * from activity;
	ELSEIF(_action = 'CREATE_ACTDETAILS') THEN
		if(_activity_id is null) THEN 
		 SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: _activity_id is required';
        LEAVE ACTIVITY_details;
		END IF;
    insert into activity_details(activity_detail_id, activity_id, activity_detail_title, activity_detail_details, assigned_student_id, schedule_date,
	due_date, assigned_by, status, activity_type, created_at, updated_at, activity_det_priority) values(uuid(), _activity_id, _activity_titile,
	_activity_details, Assigned_to, _schedule_date, _due_date,_assigned_by, 'Pending',
	_activity_type, now(), now(), _priority);
    ELSEIF(_action = 'GET_ACTIVITY') THEN
		select * from activity where Schedule_date <= date(now()) and due_date >= date(now());
	ELSEIF(_action = 'GET_ACTIVITYDETAILS') THEN
		if(Assigned_to is null) THEN 
			SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: Assigned_to is required';
			LEAVE ACTIVITY_details;
		END IF;
		select * from activity_details where assigned_student_id=Assigned_to and schedule_date <= date(now()) and due_date >= date(now());
	ELSEIF(_action = 'GET_RELATEDACTDETAILS') THEN 
		if(_activity_id is null) THEN 
		 SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: _activity_id is required';
        LEAVE ACTIVITY_details;
		END IF;
		select * from activity_details where activity_id =  _activity_id and schedule_date <= date(now()) and due_date >= date(now());
	ELSEIF(_action = 'UPDATE_ACTIVITYDET') THEN
		if(_activity_detail_id is null) THEN
			 SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: _activity_detail_id is required';
			LEAVE ACTIVITY_details;
		END IF;
        if(_status is null) THEN
			SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: _status is required';
			LEAVE ACTIVITY_details;
		END IF;
        update activity_details set `status` = _status where activity_detail_id = _activity_detail_id ;
        select _status, _activity_detail_id;
	ELSEIF(_action = 'DELETE_ACTDETAILS') THEN
		if(_activity_detail_id is null) THEN
			SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL ACTIVITY_details: _activity_detail_id is required';
			LEAVE ACTIVITY_details;
		END IF;
		delete from activity_details where activity_detail_id = _activity_detail_id  ;
		select * from activity_details where activity_id =  _activity_id and schedule_date <= date(now()) and due_date >= date(now());
    ELSEIF(_action = 'UPDATE_DETAILS') THEN
		update activity_details set activity_detail_title = _activity_titile,activity_detail_details = _activity_details, 
        assigned_student_id = Assigned_to,schedule_date = _schedule_date, due_date = _due_date,
        activity_det_priority = _priority, activity_type = _activity_type
        where activity_detail_id = _activity_detail_id;
    END IF;
END $$
DELIMITER ;
-- for circulars
DROP PROCEDURE IF EXISTS `circular_Notification`;
DELIMITER $$
CREATE PROCEDURE circular_Notification(IN _action varchar(50), IN _circular_title varchar(100), _circular_detail varchar(1000), 
IN _circular_specificto int, IN _circular_to_role int, IN _circular_attachmentURL varchar(1000), IN _circular_startDate varchar(50), 
IN _circular_endDate varchar(50), IN _circular_id varchar(36))
circular_Notification:
BEGIN
	IF(_action is null) THEN
	 SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL circular_Notification: _action can not be empty';
        LEAVE circular_Notification;
    END IF;
    IF(_action = 'CREATE_CIRCULAR') THEN
		insert into circulars(circular_id, circular_detail, circular_title,circular_specifiedto, circular_to_role, circular_url,
		  circular_startDate, circular_endDate, created_at,updated_at)
          values(uuid(), _circular_title,_circular_detail, _circular_specificto , _circular_to_role, _circular_attachmentURL, _circular_startDate
          , _circular_endDate, now(), now());
          select * from circulars;
   ELSEIF(_action = 'GET_CIRCULARS') THEN 
		if(_circular_to_role = '1') THEN
			select * from circulars where circular_to_role in (1,0) and circular_startDate <= date(now()) and circular_endDate >= date(now());
        ELSE
			select * from circulars where circular_to_role in (2,0) and circular_startDate <= date(now()) and circular_endDate >= date(now());
        END IF;
	ELSEIF(_action = 'DELETE_CIRCULAR') THEN
			IF(_circular_id is null) THEN
				SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = 'CALL circular_Notification: _circular_id can not be empty';
				LEAVE circular_Notification;
			END IF;
		delete from circulars where circular_id = _circular_id;
	ELSEIF(_action = 'UPDATE_CIRCULAR') THEN
		update circulars set circular_detail = _circular_detail, circular_title = _circular_title, circular_to_role=_circular_to_role, 
        circular_url=_circular_attachmentURL, circular_startDate=_circular_startDate,circular_endDate=_circular_endDate,updated_at = now()  where circular_id = _circular_id;
         select * from circulars;
	END IF;
END$$
DELIMITER ;
