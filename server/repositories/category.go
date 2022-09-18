package repositories

import (
	"dumflix/models"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	FindCategorys() ([]models.Category, error)
	GetCategory(ID int) (models.Category, error)
	CreateCategory(film models.Category) (models.Category, error)
	UpdateCategory(film models.Category) (models.Category, error)
	DeleteCategory(film models.Category) (models.Category, error)
}

func RepositoryCategory(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCategorys() ([]models.Category, error) {
	var films []models.Category
	err := r.db.Find(&films).Error // add this code

	return films, err
}

func (r *repository) GetCategory(ID int) (models.Category, error) {
	var film models.Category
	err := r.db.First(&film, ID).Error // add this code

	return film, err
}
func (r *repository) CreateCategory(film models.Category) (models.Category, error) {
	err := r.db.Create(&film).Error

	return film, err
}

func (r *repository) UpdateCategory(film models.Category) (models.Category, error) {
	err := r.db.Save(&film).Error

	return film, err
}

func (r *repository) DeleteCategory(film models.Category) (models.Category, error) {

	err := r.db.Delete(&film).Error

	return film, err
}
