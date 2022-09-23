package models

// import "time"

type Transaction struct {
	ID        int           `json:"id"`
	StartDate string        `json:"startDate"`
	DueDate   string        `json:"dueDate"`
	UserID    int           `json:"userid"`
	User      UsersResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Attache   string        `json:"attache" gorm:"type: varchar(255)"`
	Status    string        `json:"Status" gorm:"type: varchar(255)"`
	Price     int           `json: "price"`
}

type TransactionResponse struct {
	ID        int           `json:"id"`
	StartDate string        `json:"startDate"`
	DueDate   string        `json:"dueDate"`
	UserID    int           `json:"user_id"`
	User      UsersResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Attache   string        `json:"attache"`
	Status    string        `json:"status"`
}

type TransactionUserResponse struct {
	ID        int    `json:"id"`
	StartDate string `json:"startdate"`
	DueDate   string `json:"duedate"`
	UserID    int    `json:"user_id"`
	Attache   string `json:"attache"`
	Status    bool   `json:"status"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}

func (TransactionUserResponse) TableName() string {
	return "transactions"
}
