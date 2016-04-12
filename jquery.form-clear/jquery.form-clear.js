/**
 * Form clearing plugin
 *
 * Usage: $.formClear(selector);
 * Selector can be:
 * - a jquery selector, eg: $.formClear('.group-of-fields');
 * - a group/array of fields, eg: $.formClear($('.group-of-fields'));
 * - a single field, eg: $.formClear($('input#singleField'));
 *
 * @author Szymon Bluma https://github.com/bluemanos
 */
(function ($) {
    'use strict';

    function singleClear (field, withHidden)
    {
        var jField = $(field);
        withHidden = withHidden || false;

        switch (jField.prop('tagName').toLowerCase()) {
            case 'input':
                var inputType = jField.attr('type').toLowerCase();
                switch (inputType) {
                    case 'text':
                        jField.val('');
                        break;
                    case 'hidden':
                        if (withHidden) {
                            jField.val('');
                        }
                        break;
                    case 'checkbox':
                    case 'radio':
                        jField.prop('checked', false);
                        break;
                }
                break;
            case 'textarea':
                jField.val('');
                break;
            case 'select':
                jField.val(jField.find('option').first().val());
                break;
        }

        jField.change();
    }

    function convertFormToFields(selector)
    {
        var formField = '';
        if (typeof(selector) == 'string') {
            formField = $(selector);
        } else if (typeof(selector.selector) == 'string') {
            formField = selector;
        }

        if (formField.prop('tagName').toLowerCase() == 'form') {
            // get list of fields
            selector = formField.find('input, textarea, select');
        }

        return selector;
    }

    $.formClear = function (selector, withHidden)
    {
        selector = convertFormToFields(selector);
        withHidden = withHidden || false;

        if (typeof(selector) == 'string') {
            // it's a selector - a group of fields
            $.each($(selector).toArray(), function (i, v) {
                singleClear(v, withHidden);
            });
        } else if (typeof(selector.selector) == 'undefined') {
            // single field
            singleClear(selector, withHidden);
        } else if (typeof(selector.selector) == 'string') {
            // a group of fields
            $.each(selector.toArray(), function (i, v) {
                singleClear(v, withHidden);
            });
        }
    };

}(typeof jQuery === 'function' ? jQuery : this));
