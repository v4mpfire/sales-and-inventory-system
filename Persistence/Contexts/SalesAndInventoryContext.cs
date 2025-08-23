using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Contexts;

public class SalesAndInventoryContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<SaleItem> SaleItems { get; set; }

    public SalesAndInventoryContext(DbContextOptions<SalesAndInventoryContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .IsRequired(false);

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(GetUTCDate())")
                .HasColumnType("DateTime");

            entity.HasIndex(e => e.Email)
                .IsUnique()
                .HasFilter("[Email] IS NOT NULL");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(GetUTCDate())")
                .HasColumnType("DateTime");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(e => e.Barcode)
                .IsRequired(false)
                .HasMaxLength(150);

            entity.Property(e => e.Price)
                .HasColumnType("decimal(18,2)");

            entity.Property(e => e.StockQuantity)
                .HasDefaultValueSql("(0)");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(GetUTCDate())")
                .HasColumnType("DateTime");

            entity.HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Sale>(entity =>
        {
            entity.HasKey(e => e.SaleId);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");

            entity.Property(e => e.SaleDate)
                .HasDefaultValueSql("(GetUTCDate())")
                .HasColumnType("DateTime");

            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(s => s.Customer)
                .WithMany(c => c.Sales)
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<SaleItem>(entity =>
        {
            entity.HasKey(e => e.SaleItemId);
            entity.Property(e => e.Quantity).HasColumnType("int");
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

            entity.HasOne(s => s.Sale)
                .WithMany(si => si.SaleItems)
                .HasForeignKey(s => s.SaleId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(s => s.Product)
                .WithMany(si => si.SaleItems)
                .HasForeignKey(s => s.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
