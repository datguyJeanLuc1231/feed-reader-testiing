/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This test  loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Describing test suite named "The menu" */
    describe('The Menu', function() {
        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles on and off', function() {
            // Checks when the menu is toggled on
            $(".menu-icon-link").trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Checks when the menu is toggled off
            $(".menu-icon-link").trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });
    /* Describing test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('completes work', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);        });
    });
    /* Describing test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed'),
              firstFeed = [];
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done){
            // loads the first feed
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                firstFeed.push(entry.innerText);
            });
            // loads the second feed
            loadFeed(1, done);
        });
        it('changes its loaded content', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
        });

    });
}());
