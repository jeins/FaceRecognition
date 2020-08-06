DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS organisations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users_events;

CREATE TABLE users (
    id VARCHAR(30) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(150) NOT NULL,
    city VARCHAR(150) NOT NULL,
    country VARCHAR(150) NOT NULL,

     PRIMARY KEY (id)
);

CREATE TABLE organisations (
    id VARCHAR(30) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    address VARCHAR(150) NOT NULL,
    city VARCHAR(150) NOT NULL,
    country VARCHAR(150) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE events (
    id VARCHAR(30) NOT NULL,
    organisation_id VARCHAR(30) NOT NULL,
    title TEXT NOT NULL,
    max_guest INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (organisation_id) REFERENCES organisations (id)
);

CREATE TABLE users_events (
    id INTEGER NOT NULL AUTO_INCREMENT,
    event_id VARCHAR(30) NOT NULL,
    user_id VARCHAR(30) NOT NULL,
    is_attend INTEGER NOT NULL DEFAULT 0,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
