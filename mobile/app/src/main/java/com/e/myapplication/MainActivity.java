package com.e.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    protected Button myButtonLogin;
    protected Button myButtonSignup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

      myButtonLogin = findViewById(R.id.button_login);
      myButtonSignup = findViewById(R.id.button_signup);



      myButtonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//              Toast.makeText(getApplicationContext(), mystring, Toast.LENGTH_LONG).show();

              Intent intent = new Intent(MainActivity.this, Login.class);
              startActivity(intent);
            }
        });


      myButtonSignup.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          Intent intent = new Intent(MainActivity.this, Signup.class);
          startActivity(intent);
        }
      });
    }
}
