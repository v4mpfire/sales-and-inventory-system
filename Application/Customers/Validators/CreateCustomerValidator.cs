namespace Application.Customers;

public class CreateCustomerValidator : BaseCustomerValidator<CreateCustomer.Command, CreateCustomerDTO>
{
    public CreateCustomerValidator() : base(x => x.CustomerDTO)
    {
        
    }
}