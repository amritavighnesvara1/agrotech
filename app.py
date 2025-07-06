from flask import Flask, render_template, request, redirect, flash
import sqlite3
import traceback

app = Flask(__name__)
app.secret_key = 'secret_key_kamu'  # ganti dengan secret sesukamu

# Fungsi menyimpan data ke database
def simpan_pesan(nama, email, isi):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO message (nama, email, isi)
        VALUES (?, ?, ?)
    """, (nama, email, isi))
    conn.commit()
    conn.close()

# Route halaman utama
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        nama = request.form.get('nama')
        email = request.form.get('email')
        pesan = request.form.get('pesan')

        if nama and email and pesan:
            try:
                simpan_pesan(nama, email, pesan)
                flash('Pesan Anda berhasil disimpan. Terima kasih!', 'success')
            except Exception as e:
                traceback.print_exc()  # tampilkan error detail
                flash(f'Terjadi kesalahan saat menyimpan pesan: {str(e)}', 'error')

        else:
            flash('Semua kolom harus diisi.', 'error')
        return redirect('/')
    return render_template('index.html')

# Route lain tetap
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
