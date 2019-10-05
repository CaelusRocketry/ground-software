import time
import os
import importlib
from threading import Thread

import yaml


def load_config():
    """
    Loads a YAML file to be used as the ``config``.
    If *config_custom.yaml* exists, use that (this is user-configurable).
    Else, use *config_default.yaml*. This should not be changed while testing.
    """

    config_filename = "config_default.yml"
    if os.path.exists("config_custom.yml"):
        config_filename = "config_custom.yml"
    with open(config_filename, 'r') as stream:
        try:
            return yaml.load(stream)
        except yaml.YAMLError as e:
            print(e)


def start():
    """
    Loops through each of the modules that should be started on flight startup.
    Runs the module's corresponding functions in their own threads.
    """

    # Loop through all modules defined in the startup config
    for module_name in config["main"]["startup"]:
        module = importlib.import_module(
            f'modules.{module_name}')  # Get the module as a module
        # Loop through the function's modules listed in the startup config
        for function_name in config["main"]["startup"][module_name]:
            # Get the function as a function
            function = getattr(module, function_name)
            thread_name = module.__name__ + '.' + \
                function.__name__  # Identifier for the thread
            # Start the thread
            Thread(target=function, name=thread_name).start()


if __name__ == "__main__":
    config = load_config()  # Load the configuration file as a global
    start()
