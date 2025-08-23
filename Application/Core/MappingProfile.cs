using Application.Categories;
using AutoMapper;
using Domain.Entities;

namespace Application.Core;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateCategoryDTO, Category>();
    }
}
