<?php

class BasketController
{
    public function httpPostMethod(Http $http, array $formFields)
    {
        if(array_key_exists('basketitems', $formFields) == false)
        {
            $formFields['basketitems'] = [];
        }
        return [
            '_raw_template' => true,    
            'basketItems' => $formFields['basketitems']
        ];
       
    }
}