USE bank;
CREATE TABLE IF NOT EXISTS Transactions (
    id INT AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    vendor VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES Categories(category)
);