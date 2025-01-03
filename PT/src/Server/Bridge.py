from flask import Flask, request

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.json
    # Do something with the data
    return {"result": f"Hello {data['name']}"}

if __name__ == '__main__':
    app.run(port=5000)