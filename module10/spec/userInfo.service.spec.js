describe('UserInfoService', function() {
    'use strict';
    var UserInfoService;
    var ApiPath;
    var $httpBackend;
    var testMenuItemResponse = {
        id: 1,
        short_name: "A1",
        name: "Won Ton Soup with Chicken",
        description: "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
        price_small: 2.55,
        price_large:5.0,
        small_portion_name: "pint",
        large_portion_name: "quart",
        created_at: "2021-05-02T17:56:48.895Z",
        updated_at: "2021-05-02T17:56:48.895Z",
        category_short_name: "A",
        image_present: true};

    beforeEach(function() {
        module('restaurant');
        inject(function ($injector) {
            UserInfoService = $injector.get('UserInfoService');
            ApiPath = $injector.get('ApiPath');
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.whenGET("src/public/public.html").respond('');
            $httpBackend.whenGET("src/public/home/home.html").respond('');
            $httpBackend.whenGET(ApiPath + "/menu_items/A1.json").respond(testMenuItemResponse);
            $httpBackend.whenGET(ApiPath + "/menu_items/a1.json").respond(500, '');
        });
    });
    it('should match expected ApiPath', function () {
       expect(ApiPath).toEqual("https://mmoon9-jhu.herokuapp.com");
    });
    it('should fetch A1 menu item and not find anything for a1', function() {
        UserInfoService.getMenuItems("A1").then(function (response) {
            expect(response.name).toEqual("Won Ton Soup with Chicken");
        });
        UserInfoService.getMenuItems("a1").then(function (response){
            expect(response).toEqual('');
        });
        $httpBackend.flush();
    });
});
