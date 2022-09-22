package models

type User struct {
	ID        int    `json:"id"`
	FullName  string `json:"fullName" gorm:"type: varchar(255)"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
	Password  string `json:"-" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Address   string `json:"address" gorm:"type: varchar(255)"`
	Subscribe string `json:"subscribe" gorm:"type: varchar(255)"`
	Role      string `json:"role"`
	Token     string `json : "token" gorm:"type: varchar(255)"`
}

type UsersResponse struct {
	ID        int    `json:"id"`
	FullName  string `json:"fullName"`
	Email     string `json:"email" `
	Password  string `json:"-" `
	Gender    string `json:"gender" `
	Phone     string `json:"phone" `
	Address   string `json:"address" `
	Subscribe string `json:"subscribe" `
	Token     string `json : "token"`
}

func (UsersResponse) TableName() string {
	return "users"
}
