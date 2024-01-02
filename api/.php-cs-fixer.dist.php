<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('var')
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        'concat_space' => [
            'spacing' => 'one',
        ],
        'increment_style' => [
            'style' => 'post',
        ],
        'global_namespace_import' => [
            'import_classes' => true,
            'import_constants' => false,
            'import_functions' => true
        ]
    ])
    ->setFinder($finder)
;
