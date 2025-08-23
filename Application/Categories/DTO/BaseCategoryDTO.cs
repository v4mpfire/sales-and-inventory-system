using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories;

public class BaseCategoryDTO
{
    public required string Name { get; set; }
    public DateTime CreatedAt { get; set; }
}
