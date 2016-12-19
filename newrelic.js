import dotenv from 'dotenv';

// Read .env to properly set `process.env`
dotenv.config({
  'path': './.env'
});

const app_name = process.env.APP_NAME;

exports.config = {
  'app_name': [app_name],
  'logging': {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    'level': 'info'
  }
}
