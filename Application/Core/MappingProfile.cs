using Application.Categories;
using Application.Products;
using AutoMapper;
using Domain.Entities;

namespace Application.Core;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateCategoryDTO, Category>();
        CreateMap<UpdateCategoryDTO, Category>();
        CreateMap<Category, CategoryDTO>();

        CreateMap<CreateProductDTO, Product>();
        CreateMap<UpdateProductDTO, Product>();

        CreateMap<ProductDTO, Product>();
        CreateMap<Product, ProductDTO>()
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
    }
}
