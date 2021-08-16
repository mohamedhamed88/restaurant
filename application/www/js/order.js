$(function(){

    $('#meal').on('change',function(){

        var id = $(this).val();
       
        $.getJSON(
            getRequestUrl()+'/meal?id='+id,
            function(data)
            {
                    var img = getWwwUrl()+'/images/meals/'+data.Photo
                $('#meal-details img').attr('src',img)
                $('#meal-details p').html(data.Description)
                $('#meal-details span strong').html(formatMoneyAmount(data.SalePrice))
                $('#saleprice').val(data.SalePrice);
            }

        )
        

    })

    $('#meal').trigger('change')



    $('#order-form').on('submit',function(e){
        e.preventDefault();
        var mealId = parseInt($('#meal').val())
        var meal = $('#meal').find('option:selected').text()
        var salePrice = parseFloat($('#saleprice').val())
        var quantity = parseInt($('#quantity').val())

        var panier = loadDataFromDomStorage('basket');
        if(panier == null)
        {
            panier = [];
        }
        
        for(var i = 0; i< panier.length ; i++)
        {
            if(panier[i].mealId == mealId)
            {
               
                panier[i].quantity += quantity;
                saveDataToDomStorage('basket',panier);
                refresh()
                return;

            }
        }

        panier.push({
            mealId : mealId,
            meal : meal,
            salePrice : salePrice,
            quantity : quantity
        })

        saveDataToDomStorage('basket',panier)
        refresh()
      
    })


    function refresh()
    {
        var panier = loadDataFromDomStorage('basket');
        if(panier == null)
        {
            panier = [];
        }
        var formFields = {basketitems : panier};
        $.post(
            getRequestUrl()+'/basket',
            formFields, // {basketitems : panier},
            function(data)
            {
                $('#order-summary').empty();
                $('#order-summary').html(data);

            }
        )

    }


    $('#order-summary').on('click','button',function(event){
        alert('test')
        $button = $(event.currentTarget);
        mealId = $button.data('meal-id');
        var index;
        
        var panier = loadDataFromDomStorage('basket');
        if(panier == null)
        {
            panier = [];
        }

        // Recherche de l'aliment spécifié.
        for(index = 0; index < panier.length; index++)
        {
            if(panier[index].mealId == mealId)
            {
                // L'aliment spécifié a été trouvé, suppression.
                panier.splice(index, 1);
    
                saveDataToDomStorage('basket',panier)
    
                return true;
            }
        }
        
        refresh()

    })
    refresh()
})