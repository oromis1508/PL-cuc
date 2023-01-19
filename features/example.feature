Feature: Checkboxes

  Scenario Outline: Tables
    Given I am on the tables page
    Then I check table content
    When I click <header> header
    Then Table is sorted by <header> header

    Examples:
      | header     |
      | Last Name |
      | Email |
      | Due |
      | Web Site |
