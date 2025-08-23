using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products;

public class BaseProductDTO
{
    public int CategoryId { get; set; }
    public string? Barcode { get; set; }
    public required string Name { get; set; }
    public double Price { get; set; }
    public int StockQuantity { get; set; }
}
