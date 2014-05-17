# How to contribute
I like to encourage contributions to this repository. Contributing should be as easy as possible for you but there are a few things to consider when contributing. The following guidelines for contributions should be followed if you want to submit a [pull request](https://help.github.com/articles/using-pull-requests).

## How to prepare

* You need a [GitHub account](https://github.com/)
* Submit an [issue ticket](https://github.com/brayniverse/eloquent.js/issues) for your issue if one does not exist.
  * Describe the issue and include steps to repoduce if it's a bug.
  * Ensure to mention the earliest version that you know is affected.
* If you are able and want to fix this, [fork the repository on GitHub](https://help.github.com/articles/fork-a-repo).

## Making changes

* In your forked repository, create a topic branch for your upcoming patch. (e.g. `feature-autoplay` or `bugfix-ios-crash`)
  * Usually this is based on the master branch.
  * Create a branch based on master; `git branch fix/master/my_contribution master` then checkout the new branch with `git checkout fix/master/my_contribution`. Please avoid working directly on the `master` branch.
* Make sure you stick to the coding style that is already in use.
* Make commits of logical units and describe them properly.
* Check for unnecessary whitespace with `git diff --check` before commiting.
* If possible, submit tests to your patch / new feature so it can be tested easily.
* Assure nothing is broken by running all the tests.

## Submitting changes

* Push your changes to a topic branch in your fork of the repository.
* Open a pull request to the original repository and choose the right original branch you want to patch. Advanced users may install the `hub` gem and use the [`hub pull-request` command](https://github.com/defunkt/hub#git-pull-request).
* If not done in commit messages (which you really should do) please reference and update your issue with the code changes. But please do not close the issue yourself.
* Even if you have write access to the repository, do not directly push or merge pull-requests. Let another team member review your pull request and approve.
